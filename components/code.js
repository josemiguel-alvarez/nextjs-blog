import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism as syntaxStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./code.module.scss";

export const Code = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || "");
  const content = String(children).replace(/\n$/, "");

  if (!match) return <span className={styles.inlineSnippet}>{content}</span>;

  return (
    <div className={styles.container}>
      <SyntaxHighlighter language={match?.[1]} style={syntaxStyle}>
        {content}
      </SyntaxHighlighter>
    </div>
  );
};
