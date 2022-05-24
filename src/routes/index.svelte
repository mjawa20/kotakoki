<script>
	import axios from 'axios';
	import Carousel from '$lib/utils/Carousel.svelte';
	import Collection from '$lib/collection/Collection.svelte';
	import { collection } from '../store/collectionstore';
</script>

<!-- <Carousel /> -->
<Collection {collection} />
