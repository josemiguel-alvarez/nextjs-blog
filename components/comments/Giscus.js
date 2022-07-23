import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

import { useIsVisible } from "@/components/hooks/useIsVisible";
import siteMetadata from "@/data/siteMetadata";

const Giscus = () => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ""
      ? theme === "dark" || resolvedTheme === "dark"
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL;

  const COMMENTS_ID = "comments-container";

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false);

    const {
      repo,
      repositoryId,
      category,
      categoryId,
      mapping,
      reactions,
      metadata,
      inputPosition,
      lang,
    } = siteMetadata?.comment?.giscusConfig;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repositoryId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-reactions-enabled", reactions);
    script.setAttribute("data-emit-metadata", metadata);
    script.setAttribute("data-input-position", inputPosition);
    script.setAttribute("data-lang", lang);
    script.setAttribute("data-theme", commentsTheme);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, [commentsTheme]);

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    LoadComments();
  }, [LoadComments]);

  useEffect(() => {
    if (isVisible && enableLoadComments) {
      LoadComments();
    }
  }, [isVisible, LoadComments, enableLoadComments]);

  return (
    <div
      ref={ref}
      className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
    >
      {enableLoadComments && (
        <button onClick={LoadComments}>Load Comments</button>
      )}
      <div className="giscus" id={COMMENTS_ID} />
    </div>
  );
};

export default Giscus;
