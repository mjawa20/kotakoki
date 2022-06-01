<script>
	import { onMount } from 'svelte';
	import Dot from 'svelte-carousel/src/components/Dot/Dot.svelte';
	import { carousels, fetchCarousel, fetchCarousels } from '../../store/carousel';

	let Carousel;
	let carousel;

	$: filteredCarousels = $carousels;

	onMount(async () => {
		fetchCarousels();
		const module = await import('svelte-carousel');
		// const dots = await import('svelte-carousel/src/components/Dots/Dots.svelte');
		// Dots = dots.default;
		Carousel = module.default;
	});

	async function handlePageChange(pageIndex) {
		await methods.showPage(pageIndex, { animated: true });
	}

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
	{#if filteredCarousels.rows}
		<svelte:component
			this={Carousel}
			bind:this={carousel}
			autoplay
			arrows={false}
			let:currentPageIndex
			let:pagesCount
			let:showPage
			let:showPrevPage
			let:showNextPage
		>
			<div slot="dots" class=" mt-6 flex items-center space-x-10">
				<i
					class="fa-solid fa-angle-left  cursor-pointer text-amber-900 text-sm"
					on:click={showPrevPage}
				/>
				<div class="space-x-5 flex items-center">
					{#each Array(pagesCount) as _, pageIndex (pageIndex)}
						<Dot active={currentPageIndex === pageIndex} on:click={() => showPage(pageIndex)} />
					{/each}
				</div>
				<i
					class="fa-solid fa-angle-right   cursor-pointer text-amber-900 text-sm"
					on:click={showNextPage}
				/>
			</div>
			{#each $carousels.rows as row}
				<div style="max-height: 650px;">
					<div class="relative">
						{#if row.link}
							<a
								href={row.link}
								style="background: #6f4421;top: 18.5rem; right: 6.5rem;"
								class=" z-50 absolute bg-black text-white  p-2">Our Story</a
							>
						{/if}
						<div class="bg-black absolute  w-full h-full opacity-10" />
						<img src={row.imageUrl} alt="" class="w-full object-contain" />
					</div>
				</div>
			{/each}
		</svelte:component>
	{/if}
</div>
