import markdownStyles from "./markdown-styles.module.css";

export default function PostBody({ children }) {
  return <div className={markdownStyles["markdown"]}>{children}</div>;
}
