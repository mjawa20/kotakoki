<script>
	import NotificationDropdown from '../dropdowns/NotificationDropdown.svelte';
	import UserDropdown from '../dropdowns/UserDropdown.svelte';

	import { page } from '$app/stores';

	let collapseShow = 'hidden';
	export let items = [];

	function toggleCollapseShow(classes) {
		collapseShow = classes;
	}
</script>

<nav
	class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
>
	<div
		class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
	>
		<!-- Toggler -->
		<button
			class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
			type="button"
			on:click={() => toggleCollapseShow('bg-white m-2 py-3 px-6')}
		>
			<i class="fas fa-bars" />
		</button>
		<!-- Brand -->
		<a
			class="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
			href="/"
		>
			Kokikota
		</a>
		<!-- User -->
		<ul class="md:hidden items-center flex flex-wrap list-none">
			<li class="inline-block relative">
				<NotificationDropdown />
			</li>
			<li class="inline-block relative">
				<UserDropdown />
			</li>
		</ul>
		<!-- Collapse -->
		<div
			class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
		>
			<!-- Collapse header -->
			<div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
				<div class="flex flex-wrap">
					<div class="w-6/12">
						<a
							class="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
							href="/"
						>
							Notus Svelte
						</a>
					</div>
					<div class="w-6/12 flex justify-end">
						<button
							type="button"
							class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
							on:click={() => toggleCollapseShow('hidden')}
						>
							<i class="fas fa-times" />
						</button>
					</div>
				</div>
			</div>
			<!-- Form -->
			<form class="mt-6 mb-4 md:hidden">
				<div class="mb-3 pt-0">
					<input
						type="text"
						placeholder="Search"
						class="border-0 px-3 py-2 h-12 border border-solid border-gray-500 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
					/>
				</div>
			</form>

			<!-- Divider -->
			<hr class="my-4 md:min-w-full" />

			<!-- Navigation -->
			<ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
				{#each items as item}
					<li
						class="{$page.url.pathname === item.link
							? 'bg-red-500 text-white'
							: ''} inline-flex group hover:bg-red-500 hover:text-white p-2 hover:cursor-pointer"
					>
						<a href={item.link} class=" text-sm block no-underline font-semibold w-full h-full">
							<i
								class="fa-fw fas fa-{item.icon} mr-2  group-hover:text-white text-base {$page.url
									.pathname === item.link
									? ' text-white'
									: 'text-gray-300'}"
							/>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
