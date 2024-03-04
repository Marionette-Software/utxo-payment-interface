
module.exports = {
    timeout(ms) {
        console.log("sleep", ms);
        return new Promise(resolve => setTimeout(resolve, ms));
   }
  }