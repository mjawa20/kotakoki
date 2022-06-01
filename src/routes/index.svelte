<script>
	import Carousel from '$lib/utils/Carousel.svelte';
	import Collection from '$lib/collection/Collection.svelte';
	import { collections, fetchCollections } from '../store/collection';
	import { onMount } from 'svelte';
	let filteredCollection;

	onMount(() => fetchCollections());

	$: {
		if ($collections.rows) {
			filteredCollection = $collections.rows.slice(0, 4);
		}
	}
</script>

<Carousel />
<Collection {filteredCollection} />
