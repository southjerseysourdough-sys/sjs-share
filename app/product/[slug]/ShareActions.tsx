"use client";

import { useMemo, useState } from "react";

/**
 * ShareActions component for South Jersey Sourdough.
 *
 * This component renders a set of share buttons with inline SVG icons for
 * various social platforms (Facebook, X/Twitter, Pinterest) as well as
 * buttons for copying the link, sharing via email, and using the native
 * share API when supported. All icons inherit the current text color and
 * spacing is handled via CSS. The component accepts the product title,
 * description, share URL, and image as props.
 */
type ShareActionsProps = {
  title: string;
  description: string;
  shareUrl: string;
  image: string;
};

export default function ShareActions({
  title,
  description,
  shareUrl,
  image,
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = encodeURIComponent(image);

  const emailBody = useMemo(() => `${title}\n\n${shareUrl}`, [title, shareUrl]);

  async function handleNativeShare() {
    if (!canNativeShare) return;
    try {
      await navigator.share({ title, text: description, url: shareUrl });
    } catch {
      /* ignore errors */
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const pinterestHref =
    `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}%20%E2%80%93%20${encodedDescription}`;
  const emailHref = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
    emailBody,
  )}`;

  return (
    <div className="shareSection">
      <div className="shareHeader">
        <h2>Share this product</h2>
        <p>Send it where people will actually see it.</p>
      </div>

      <div className="shareGrid">
        {canNativeShare && (
          <button
            type="button"
            className="shareButton primaryShare"
            onClick={handleNativeShare}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.5 1a.5.5 0 0 0-.5.5v2.793L6.854 9.439a.5.5 0 0 0 .707.707l6.146-6.146V7.5a.5.5 0 0 0 1 0V1.5A.5.5 0 0 0 14.5 1h-5a.5.5 0 0 0 0 1h3.793L7.561 7.732a.5.5 0 1 0 .707.707L14 2.207V6a.5.5 0 0 0 1 0V1.5a.5.5 0 0 0-.5-.5z" />
              <path d="M4 3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a.5.5 0 0 0-1 0v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3a.5.5 0 0 0 0-1H4z" />
            </svg>
            Share
          </button>
        )}

        <button type="button" className="shareButton" onClick={handleCopyLink}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
          </svg>
          {copied ? "Copied" : "Copy Link"}
        </button>

        <a
          className="shareButton"
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
          </svg>
          Facebook
        </a>

        <a
          className="shareButton"
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
          </svg>
          X
        </a>

        <a
          className="shareButton"
          href={pinterestHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0" />
          </svg>
          Pinterest
        </a>

        <a className="shareButton" href={emailHref}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
          </svg>
          Email
        </a>
      </div>
    </div>
  );
}