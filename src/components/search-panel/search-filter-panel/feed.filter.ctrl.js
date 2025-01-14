/* @ngInject */
export default class FeedFilterCtrl {
	/* @ngInject */
	constructor (YoutubeSearch) {
		Object.assign(this, { YoutubeSearch })
		this.data = {
			items: [
			{ label: 'Videos', icon: 'film', value: 'video' },
			{ label: 'Playlists', icon: 'th-list', value: 'playlist' }
			]
		};
		const activeFeedType = this.YoutubeSearch.getFeedType();
		this.active = this.data.items.find(item => item.value === activeFeedType);
	}

    setFeed (item){
		this.active = item;
        this.YoutubeSearch.setType(item.value);
        this.YoutubeSearch.search()
	}
}