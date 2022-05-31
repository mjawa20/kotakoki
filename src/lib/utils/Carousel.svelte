<script>
	import { onMount } from 'svelte';

	let Carousel;
	let carousel;
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	const carouselPhotos = ['/assets/img/a.jpg', '/assets/img/b.png', '/assets/img/c.jpg'];

	const handleNextClick = () => {
		carousel.goToNext();
	};
</script>

<div class="my-10">
	<svelte:component this={Carousel} bind:this={carousel} autoplay>
		{#each carouselPhotos as src}
			<div style="  max-height: 650px;">
				<button style="background: #6f4421;" class=" z-50 absolute text-white top-1/3 left-9">asyudgu</button>
				<div class="bg-black absolute  w-full h-full opacity-20">
				</div>
				<img {src} alt="" style="height: 100%; width:100%" />
			</div>
		{/each}
	</svelte:component>
</div>
