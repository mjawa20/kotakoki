<script>
	import CollectionsListSkel from '../skeleton/CollectionsListSkel.svelte';

	export let collection;
	import CollectionItem from './CollectionItem.svelte';
</script>

<div class="mb-14">
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Collection list</h1>
	{#if $collection.length}
		<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
			{#each $collection as collection}
				<CollectionItem {...collection} />
			{/each}
		</div>
	{:else}
		<CollectionsListSkel />
	{/if}
</div>
<div class="w-full md:w-1/2 ">
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Collection list</h1>
	<CollectionItem />
</div>
