let options = {
    getOptions() {
        chrome.storage.sync.get('remember', (v) => {
            let radioId = v.remember ? 'remember' : 'disable';
            document.getElementById(radioId).checked = true;
        })
    },
    setOptions() {
        document.querySelectorAll('.radio').forEach((e) => {
            e.addEventListener('click', (e) => {
                let remember = e.currentTarget.id === 'remember' ? true : false;
                chrome.storage.sync.set({
                    remember
                })
            })
        })
    },
    init() {
        this.getOptions()
        this.setOptions()
    }
}
options.init()
