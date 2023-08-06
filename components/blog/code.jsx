import SyntaxHighlighter from "react-syntax-highlighter";

const Code = ({ children, language }) => {
  return (
    <div className="code">
      <SyntaxHighlighter language={language}>{children}</SyntaxHighlighter>
    </div>
  );
};

export default Code;
