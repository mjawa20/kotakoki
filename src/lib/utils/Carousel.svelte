<script>
	const image = '/assets/img/b.png';
	import { slide } from 'svelte/transition';

	const carouselPhotos = [
		'https://picsum.photos/300/200?random=1',
		'https://picsum.photos/300/200?random=2',
		'https://picsum.photos/300/200?random=3'
	];

	let index = 0;

	const next = () => {
		index = (index + 1) % carouselPhotos.length;
	};
</script>

<div class="relative mt-10 mb-5">
	<div class="bg-black w-full h-full absolute opacity-50" />
	<!-- <img src={image} alt="" width="100%" /> -->
	{#each [carouselPhotos[index]] as src (index)}
		<img transition:slide={{easing:"x"}} {src} alt="" width="100%" />
	{/each}
</div>
<div class="mb-10 text-center">
	<i class="fas fa-angle-left" />
	<i on:click={next} class="fas fa-angle-right" />
</div>
