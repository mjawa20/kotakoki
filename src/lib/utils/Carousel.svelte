<script>
	import { onMount } from 'svelte';
	import { carousels, fetchCarousel, fetchCarousels } from '../../store/carousel';

	let Carousel;
	let carousel;

	$: filteredCarousels = $carousels;

	onMount(async () => {
		fetchCarousels();
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	const carouselPhotos = [
		'https://cdn.shopify.com/s/files/1/0515/0975/6059/files/Copy_of_Copy_of_Copy_of_Recipe_Card_kotakoki-2_2048x.png?v=1612355414',
		'https://cdn.shopify.com/s/files/1/0515/0975/6059/files/430FD710-9166-42CB-AB5F-0F4484B9FE5E_2048x.png?v=1642436494',
		'https://cdn.shopify.com/s/files/1/0515/0975/6059/files/B5DBA2CC-9112-4827-AD96-440C829A0616_2048x.png?v=1636966216'
	];

	const handleNextClick = () => {
		carousel.goToNext();
	};
	$: console.log(filteredCarousels);
</script>

<div class="my-10">
	<svelte:component this={Carousel} bind:this={carousel} autoplay>
		{#if filteredCarousels.rows}
			{#each $carousels.rows as row}
				<div class="relative" style="max-height: 650px;">
					<button
						style="background: #6f4421;top: 18.5rem; right: 6.5rem;"
						class=" z-50 absolute bg-black text-white  p-2">Our Story</button
					>
					<div class="bg-black absolute  w-full h-full opacity-10" />
					<img src={row.imageUrl} alt="" class="w-full object-contain" />
				</div>
			{/each}
		{/if}
	</svelte:component>
</div>
