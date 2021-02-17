<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand">Aplicación MEVN</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse bg-secondary" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/notes" class="nav-link">Notes</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/landing" class="nav-link">Landing Page</router-link>
                </li>
              </ul>
            </div>
        </nav>
        <!-- CONTENT -->
        <router-view />
    </div>
</template>