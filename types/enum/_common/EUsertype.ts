// user role types
enum EUsertype {
    default = 0,
    signed = 1 << 2,
    regular = 1 << 5,
    verified = 1 << 8,
    promod = 1 << 11,
    pro = 1 << 14,
    blogwriter = 1 << 17,
    newswriter = 1 << 18,
    blogadmin = 1 << 19,
    newsadmin = 1 << 20,
    blognewsadmin = 1 << 21,
    adminmod = 1 << 28,
    admin = 1 << 29,
    superadmin = 1 << 30,
}

export default EUsertype;
