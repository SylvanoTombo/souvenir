<?php

use Inertia\Testing\AssertableInertia as Assert;

it('has homepage')->get('/')
    ->assertStatus(200)
    ->assertInertia(fn (Assert $page) => $page
        ->component('Welcome')
    );
