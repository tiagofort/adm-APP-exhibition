<template>
  <div class="px-4 py-6 sm:px-6 lg:px-8">
    <div
      class="mx-auto grid w-full max-w-5xl grid-cols-1 md:grid-cols-[1fr_minmax(0,720px)_1fr]"
    >
      <div class="hidden md:block"></div>

      <div class="w-full">
        <div
          class="relative overflow-hidden rounded-2xl border border-red-100 bg-white/90 p-5 shadow-lg shadow-red-100/40 backdrop-blur-sm transition-all sm:p-6"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-red-50 via-white to-blue-50"
          ></div>

          <div
            class="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md shadow-red-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V7.75a4.5 4.5 0 10-9 0v2.75m-.75 0h10.5A1.5 1.5 0 0118.75 12v6A1.5 1.5 0 0117.25 19.5H6.75A1.5 1.5 0 015.25 18v-6a1.5 1.5 0 011.5-1.5z"
                  />
                </svg>
              </div>

              <div class="min-w-0">
                <p
                  class="text-xs font-semibold uppercase tracking-[0.18em] text-red-500"
                >
                  Restricted access
                </p>
                <p
                  class="mt-1 text-base font-semibold text-slate-900 sm:text-lg"
                >
                  YOU ARE NOT LOGGED IN. ACCESS DENIED!
                </p>
                <p class="mt-2 text-sm leading-6 text-slate-500">
                  Please sign in to continue and access this page securely.
                </p>
              </div>
            </div>

            <NuxtLink
              to="/login"
              class="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-auto"
            >
              Go to Login
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="hidden md:block"></div>
    </div>
  </div>
</template>
