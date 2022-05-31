<script>
	import { onMount } from 'svelte';

	let Carousel;
	let carousel;
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	const carouselPhotos = [
		'https://cdn.shopify.com/s/files/1/0515/0975/6059/files/Copy_of_Copy_of_Copy_of_Recipe_Card_kotakoki-2_2048x.png?v=1612355414',
		'/assets/img/b.png',
		'/assets/img/c.jpg'
	];

	const handleNextClick = () => {
		carousel.goToNext();
	};
</script>

<div class="my-10">
	<svelte:component this={Carousel} bind:this={carousel} autoplay>
		{#each carouselPhotos as src}
			<div class="relative" style="max-height: 650px;">
				<button
					style="background: #6f4421;"
					class=" z-50 absolute bg-black text-white top-1/2 
					right-24 p-2">Our Story</button
				>
				<div class="bg-black absolute  w-full h-full opacity-10" />
				<img {src} alt="" class="w-full object-contain"/>
			</div>
		{/each}
	</svelte:component>
</div>
