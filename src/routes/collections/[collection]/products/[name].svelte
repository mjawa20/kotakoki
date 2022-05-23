<script>
	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import CollectionItem from '$lib/collection/CollectionItem.svelte';
	import Detail from '$lib/collection/Detail.svelte';
</script>

<div class="mt-10">
	<Breadcrumb />
	<div class="flex flex-col md:flex-row mt-8 gap-7">
		<div class="flex w-full md:w-4/6 gap-8 ">
			<img src="/assets/img/a.jpg" alt="" class="w-full max-h-80" />
			<div class="flex flex-col w-2/12 gap-3 ">
				<img src="/assets/img/c.jpg" alt="" />
				<img src="/assets/img/c.jpg" alt="" />
				<img src="/assets/img/c.jpg" alt="" />
			</div>
		</div>
		<Detail />
	</div>
	<div class="mt-14">
		<h1 class="font-bold text-sm text-amber-900 mb-5">Recomendation for you</h1>
		<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
			<CollectionItem />
			<CollectionItem />
			<CollectionItem />
			<CollectionItem />
		</div>
	</div>
</div>
