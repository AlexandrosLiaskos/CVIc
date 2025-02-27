// Add this at the top of your main entry file
const cvReady = new Promise((resolve) => {
  if (window.cv) {
    resolve();
  } else {
    window.onCvReady = resolve;
  }
});

// Export for use in other components
export { cvReady };
