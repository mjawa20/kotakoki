<script>
	import { register } from '../store/user';
	import { clearData } from '../utils';
	import { goto } from '$app/navigation';

	let user = {
		name: '',
		surName: '',
		email: '',
		password: ''
	};

	let isUpload = false;

	const handlePost = async () => {
		isUpload = true;
		await register(user);
		clearData(user);
		isUpload = true;

		await goto('/login');
		alert('berhasil register');
	};
</script>

<div class="w-full md:w-1/2 flex flex-col">
	<h1 class="font-bold text-2xl text-amber-900 my-10">Create an account</h1>
	<input
		disabled={isUpload}
		type="text"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Name"
		bind:value={user.name}
	/>
	<input
		disabled={isUpload}
		type="text"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Surname"
		bind:value={user.surName}
	/>
	<input
		disabled={isUpload}
		type="email"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Email address"
		bind:value={user.email}
	/>
	<input
		disabled={isUpload}
		type="password"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Password"
		bind:value={user.password}
	/>
	<button
		disabled={isUpload}
		class="disabled:bg-slate-400 mb-4 p-3 rounded-sm bg-amber-900 text-white w-fit font-semibold text-sm"
		on:click={handlePost}
	>
		{#if isUpload}
			<div class="flex items-center">
				<div class="border-dashed animate-spin  w-4 h-4 border-2 rounded-full mr-1" role="status" />
				Creating...
			</div>
		{:else}
			Create
		{/if}
	</button>
	<a href="/" class=" rounded-sm  text-amber-900 w-fit font-semibold text-sm ">Return the store</a>
</div>
