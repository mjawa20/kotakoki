<script>
	import { collections, fetchCollections } from '../../store/collectionstore';
	import CollectionItem from '$lib/collection/CollectionItem.svelte';
	import CollectionsListSkel from '../../lib/skeleton/CollectionsListSkel.svelte';
	import { onMount } from 'svelte';

	onMount(() => fetchCollections());
	console.log($collections);
</script>

<div class="mt-10">
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Collection list</h1>
	{#if $collections.length}
		<div class="grid md:grid-cols-4 grid-cols-2 justify-between gap-6">
			{#each $collections as collection}
				<CollectionItem {collection} />
			{/each}
		</div>
	{:else}
		<CollectionsListSkel />
	{/if}
</div>
