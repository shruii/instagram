const filterContent = () => {
  const posts = document.querySelectorAll("article"); // Fetch Instagram posts
  posts.forEach((post) => {
    const postText = post.innerText;

    // Example: Detect inappropriate content using keywords
    const inappropriateKeywords = ["badword1", "badword2", "clickbait"];
    if (inappropriateKeywords.some((word) => postText.includes(word))) {
      // Replace flagged content
      post.innerHTML = `
        <div style="padding: 20px; text-align: center; background: #f5f5f5; border-radius: 10px;">
          <p>🌟 This content has been replaced for your well-being. 🌟</p>
          <p>"Stay positive, work hard, and make it happen!"</p>
          <button id="thumbs-up" style="margin-right: 10px;">👍</button>
          <button id="thumbs-down">👎</button>
        </div>
      `;

      // Handle feedback
      post.querySelector("#thumbs-up").addEventListener("click", () => {
        sendFeedback("positive", window.location.href);
      });

      post.querySelector("#thumbs-down").addEventListener("click", () => {
        sendFeedback("negative", window.location.href);
      });
    }
  });
};

const sendFeedback = (sentiment, url) => {
  chrome.runtime.sendMessage({ type: "feedback", sentiment, url }, (response) => {
    if (response.status === "success") {
      console.log("Feedback submitted successfully.");
    }
  });
};

// Monitor DOM changes for dynamic Instagram content
const observer = new MutationObserver(filterContent);
observer.observe(document.body, { childList: true, subtree: true });
