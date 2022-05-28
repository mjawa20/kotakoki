<script>
	import { fly } from 'svelte/transition';
	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import ImageModal from '../../../../lib/utils/ImageModal.svelte';
	import Confirm from '../../../../lib/utils/Confirm.svelte';
	let showConfirm;
</script>

<Confirm bind:showConfirm onDelete={() => alert('delete success')} />
<div
	in:fly={{ x: 600 }}
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white"
>
	<div class="flex justify-between items-center mb-5 ">
		<h3 class="font-semibold text-lg text-gray-700">
			<a href="/admin/product">
				<i class="fas fa-arrow-left-long mr-3" />
			</a>
			Images
		</h3>
		<button>Addd</button>
	</div>
	<Breadcrumb />
	<div class="grid grid-cols-5 mt-10 gap-5 justify-items-center ">
		<ImageModal src="/assets/img/a.jpg" type="gallery" bind:showConfirm />
	</div>
</div>
