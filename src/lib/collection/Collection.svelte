<script>
import CollectionItemSkel from '../skeleton/CollectionItemSkel.svelte';

	import CollectionsListSkel from '../skeleton/CollectionsListSkel.svelte';
	import CollectionItem from './CollectionItem.svelte';

	export let filteredCollection;
	console.log(filteredCollection, 'aku');
</script>

<div class="mb-14">
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Collection list</h1>
	{#if filteredCollection.length != 0}
		<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
			{#each filteredCollection as collection}
				<CollectionItem {collection} />
			{/each}
		</div>
	{:else}
		<CollectionsListSkel />
	{/if}
</div>
<div class="w-full md:w-1/2 ">
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Collection list</h1>
	{#if filteredCollection.length != 0}
		<CollectionItem collection={filteredCollection[0]} />
	{:else}
		<CollectionItemSkel />
	{/if}
</div>
