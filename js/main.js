/**
 *  Code segment from:
 *  https://gist.github.com/addyosmani/fd3999ea7fce242756b1
 *
 *  [].forEach.call(document.querySelectorAll("*"),function(a){
 *      a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
 *  })
 */


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    document.querySelectorAll('*').forEach((e) => {
        if (request) {
            e.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16);
        } else {
            e.style.outline = 'none';
        }
    })
})
