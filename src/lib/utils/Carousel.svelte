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
			<div style="max-height: 500px;">
				<img {src} alt="" style="height: 100%; width:100%" />
			</div>
		{/each}
	</svelte:component>
</div>
