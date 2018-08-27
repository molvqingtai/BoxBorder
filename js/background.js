let boxBorder = {
    remember: false,
    highlightTabs: [],
    setTab(updated) {
        chrome.tabs.query({ active: true, highlighted: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                let tabIndex = this.findTabIndex(tabs[0].id);
                if (tabIndex !== -1) {
                    if (!updated) {
                        this.highlightTabs[tabIndex].highlighted = !this.highlightTabs[tabIndex].highlighted;
                    }
                    if (updated && !this.remember) {
                        this.highlightTabs[tabIndex].highlighted ? this.highlightTabs[tabIndex].highlighted = false : false;
                    }
                    chrome.tabs.sendMessage(tabs[0].id, this.highlightTabs[tabIndex].highlighted);
                } else {
                    console.error('error:', 'Tab is notfound!')
                }

            }

        })

    },
    addListener() {
        chrome.browserAction.onClicked.addListener(() => {
            this.setTab(false);
        })
        chrome.tabs.onCreated.addListener((tab) => {
            this.highlightTabs.push({ id: tab.id, highlighted: false })
        })
        chrome.tabs.onRemoved.addListener((tabId) => {
            this.highlightTabs.splice(this.findTabIndex(tabId), 1)
        })
        chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
            this.highlightTabs.push({ id: addedTabId, highlighted: false });
            this.highlightTabs.splice(this.findTabIndex(removedTabId), 1)
            console.log('onReplaced:', addedTabId, removedTabId)
        })
        chrome.tabs.onUpdated.addListener((tabId, complete) => {
            if (complete.status === 'complete') {
                this.setTab(true)
            }
        })
        chrome.storage.onChanged.addListener((o) => {
            this.remember = o.remember.newValue;
        })
    },
    setOptions() {
        chrome.storage.sync.set({
            remember: this.remember
        })
    },
    findTabIndex(tabId) {
        return this.highlightTabs.findIndex((tab) => {
            return tab.id === tabId
        })
    },
    init() {
        this.addListener()
        this.setOptions()
    }
}

boxBorder.init()
