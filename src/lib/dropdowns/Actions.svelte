<script>
	// library for creating dropdown menu appear on click
	import { createPopper } from '@popperjs/core';

	// core components

	let dropdownPopoverShow = false;

	let btnDropdownRef;
	let popoverDropdownRef;

	const toggleDropdown = (event) => {
		event.preventDefault();
		if (dropdownPopoverShow) {
			dropdownPopoverShow = false;
		} else {
			dropdownPopoverShow = true;
			createPopper(btnDropdownRef, popoverDropdownRef, {
				placement: 'bottom-start'
			});
		}
	};

	export let actions = [];
	export let data;
</script>

<div>
	<a
		class="text-gray-500 py-1 px-3"
		href="#pablo"
		bind:this={btnDropdownRef}
		on:click={toggleDropdown}
	>
		<i class="fas fa-ellipsis-v" />
	</a>
	<div
		bind:this={popoverDropdownRef}
		class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow
			? 'block'
			: 'hidden'}"
	>
		{#each actions as action}
			<a
				href="#pablo"
				on:click={(e) => {
					e.preventDefault();
					action.function(data);
					dropdownPopoverShow = false;
				}}
				class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
			>
				{action.name}
			</a>
		{/each}
	</div>
</div>
