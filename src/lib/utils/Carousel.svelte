<script>
	const image = '';
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	const carouselPhotos = ['/assets/img/a.jpg', '/assets/img/b.png', '/assets/img/c.jpg'];

	let index = 0;

	const next = () => {
		if (index < carouselPhotos.length - 1) index += 1;
		console.log(index);
	};
	const back = () => {
		if (index != 0) {
			index = index - 1;
		}
		console.log(index);
	};
</script>

<div class="group relative mt-10 mb-5 w-full h-full ">
	<!-- <img src={image} alt="" width="100%" /> -->
	{#each [carouselPhotos[index]] as src (index)}
		<div class="relative" in:fade>
			<div class="bg-black w-full h-full absolute opacity-50 " />
			<img {src} alt="" style="height: 400px; width:100%" class="md:" />
		</div>
	{/each}
	<i
		on:click={back}
		class="hover:scale-105 cursor-pointer shadow-lg hidden group-hover:block -translate-x-6 absolute py-4 px-5 bg-white rounded-full bottom-1/2 fas fa-angle-left "
	/>
	<i
		on:click={next}
		class="hover:scale-105 cursor-pointer shadow-lg hidden group-hover:block translate-x-6 absolute py-4 px-5 bg-white rounded-full bottom-1/2 right-0 fas fa-angle-right"
	/>
</div>
