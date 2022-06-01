<script>
	import CollectionItemSkel from '../skeleton/CollectionItemSkel.svelte';

	import CollectionsListSkel from '../skeleton/CollectionsListSkel.svelte';
	import CollectionItem from './CollectionItem.svelte';

	export let filteredCollection;
</script>

<div class="mb-14">
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Collection list</h1>
	{#if filteredCollection}
		{#if filteredCollection.length}
			<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
				{#each filteredCollection as collection}
					<CollectionItem {collection} />
				{/each}
			</div>
		{:else}
			Data Collections is empty
		{/if}
	{:else}
		<CollectionsListSkel />
	{/if}
</div>
<div class="w-full md:w-1/2 ">
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Collection list</h1>
	{#if filteredCollection}
		{#if filteredCollection.length}
			<CollectionItem collection={filteredCollection[0]} />
		{:else}
			Data Collection is Empty
		{/if}
	{:else}
		<CollectionItemSkel />
	{/if}
</div>
