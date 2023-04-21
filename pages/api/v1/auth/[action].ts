/*  Importings    */
import { NextApiRequest, NextApiResponse } from "next";
import mongodb from "../../../../constants/mongodb";
import apiauthresolver from "../../../../constants/apiauthresolver";
import User from "../../../../types/schema/user/SUser";

import permissions from "../../../../constants/hooks/getPermissions";
import EUsertype from "../../../../types/enum/_common/EUsertype";

/*  API Route Handler   */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await handleGET(req, res); // Handle GET requests
      break;
    case "POST":
      await handlePOST(req, res); // Handle POST requests
      break;
    default:
      return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
  }
}

/*  Handle HTTP GET Actions    */
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  await mongodb.Connect();
  const action = req.query.action;
  switch (action) {
    case "myinfo":
      const authresp = apiauthresolver.resolveToken(req, res); // Resolve the user type & id4
      if (authresp.success && authresp.user.id.length > 0) {
        let resp = await User.findOne(
          { _id: authresp.user.id, draft: false, deleted: false },
          { name: 1, status: 1, "thumbnail.src": 1, email: 1 }
        );
        if (resp) {
          return res.status(200).json({ user: resp });
        } else {
          await apiauthresolver.setToken(res); // set the cookie to an empty user
          return res.status(404).json({ error: "User not found" });
        }
      }
      return res.status(400).json({ error: "Invaild token" });
      break;
    default:
      return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
  }
}

/*  Handle HTTP POST Actions    */
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const action = req.query.action;
  switch (action) {
    case "signin":
      await handleSignin(req, res); // Handle Signin requests
      break;
    case "signup":
      await handleSignup(req, res); // Handle Signup requests
      break;
    case "signout":
      await handleSignout(req, res); // Handle Signout requests
      break;
    default:
      return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
  }
}

async function handleSignin(req: NextApiRequest, res: NextApiResponse) {
  await mongodb.Connect();
  try {
    let resp = await User.findOne(
      { authid: req.body.authid, draft: false, deleted: false },
      { name: 1, status: 1, "thumbnail.src": 1, email: 1 }
    );
    if (resp) {
      apiauthresolver.setToken(res, {
        id: resp._id,
        name: `${resp.name.first} ${resp.name.last}`,
        status: resp.status,
      }); // Set the token
      return res.status(200).json({ user: resp });
    } else {
      apiauthresolver.setToken(res); // set the cookie to an empty user
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e: any) {
    return res.status(500).json({ error: e?.message });
  }
}

async function handleSignup(req: NextApiRequest, res: NextApiResponse) {
  await mongodb.Connect();
  try {
    const authid = req.body.authid;
    let eu = await User.findOne({ authid: req.body.authid }, { name: 1 });
    if (eu) {
      return res.status(409).json({ error: "User already exists" });
    }
    var p = permissions.getUserCollectionPermission(EUsertype.default, "users"); // Get the permissions for the current user
    if (!p.create.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the user has the permission to create the collection

    let user = p.resolveObject(req.body, p.create); // Sanitize the request body
    user.status = EUsertype.regular;
    const resp = await User.create({
      ...user,
      authid: authid,
      draft: req.query.draft === "true",
    }); // Create the user
    if (resp) {
      apiauthresolver.setToken(res, {
        id: resp._id,
        name: `${resp.name.first} ${resp.name.last}`,
        status: resp.status,
      }); // Set the token
    }
    const userobj = p.resolveObjectArray(resp, p.create.hiddenprops);
    return res.status(200).json({
      user: {
        _id: userobj._id,
        name: userobj.name,
        status: userobj.status,
        "thumbnail.src": userobj.thumbnail.src,
      },
    }); // Return the sanitized user
  } catch (e: any) {
    return res.status(500).json({ error: e?.message });
  }
}

async function handleSignout(req: NextApiRequest, res: NextApiResponse) {
  apiauthresolver.setToken(res); // set the cookie to an empty user
  return res.status(200).json({ message: "User signed out" });
}
