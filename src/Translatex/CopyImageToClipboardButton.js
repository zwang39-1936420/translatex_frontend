import React, { useRef, useEffect } from 'react';
import katex from 'katex';
import * as htmlToImage from 'html-to-image';
import ClipboardJS from 'clipboard';

import 'katex/dist/katex.min.css'; // Import KaTeX styles
import 'clipboard/dist/clipboard.min.js'; // Import ClipboardJS styles

const LatexToImageAndCopyButton = ({ latexCode }) => {
  var Latex = require('react-latex');
  const latexContainerRef = useRef(null);
  const latexExpression = String(latexCode);

  // Ensure latexExpression is a non-empty string before rendering
  if (typeof latexExpression === 'string' && latexExpression.trim() !== '') {
    try {
      katex.render(latexCode, latexContainerRef.current, { displayMode: true });
      console.log('KaTeX rendering successful:', latexExpression);
    } catch (error) {
      console.error('KaTeX rendering error:', error);
    }
  }


  const handleCopy = () => {
    const latexContainer = latexContainerRef.current;

    // Use html-to-image to convert the HTML content to an image
    htmlToImage.toPng(latexContainer, { useCORS: true, allowTaint: true, backgroundColor: 'white' })
      .then((dataUrl) => {
        // Copy the image to the clipboard
        const clipboard = new ClipboardJS('.copy-button', {
          text: () => dataUrl,
        });

        clipboard.on('success', (e) => {
          console.log('Image copied to clipboard:', e.text);
          clipboard.destroy();
        });

        clipboard.on('error', (e) => {
          console.error('Failed to copy image:', e.action);
          clipboard.destroy();
        });

        // Trigger the copy button click
        const copyButton = document.getElementById('copyButton');
        copyButton.click();
      })
      .catch((error) => {
        console.error('Failed to convert LaTeX to image:', error);
      });
  };

  return (
    <div>
      <Latex ref={latexContainerRef}>{`$${latexCode}$`}</Latex>
      <button id="copyButton" className="copy-btn" onClick={handleCopy}>
        Copy LaTeX as Image
      </button>
    </div>
  );
};

export default LatexToImageAndCopyButton;
