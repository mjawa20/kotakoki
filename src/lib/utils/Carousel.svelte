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
	<svelte:component this={Carousel} bind:this={carousel} autoplay >
		{#each carouselPhotos as src}
			<img {src} alt="" style="height: 100%; width:90%" />
		{/each}
	</svelte:component>
</div>
