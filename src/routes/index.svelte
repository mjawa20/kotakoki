<script>
	import Carousel from '$lib/utils/Carousel.svelte';
	// import Collection from '$lib/collection/Collection.svelte';
	import { collection } from '../store/collectionstore';
	let filteredCollection = [];

	$: {
		if($collection) filteredCollection = $collection.splice(0, 4);
	}

	console.log(filteredCollection);
</script>

<Carousel />
<!-- <Collection {filteredCollection} /> -->
