import { mount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Pagination', () => {
  let wrapper:any;

  beforeEach(() => {
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('goToPage method updates query parameter and current page', () => {
    wrapper = mount(Pagination, {
      mocks: {
        $route: {
          query: { page: '1' },
        },
        $router: {
          push: ()=>{},
        },
      },
      data() {
        return {
          currentPage: 1,
          itemsPerPage: 10,
          items: [],
        };
      },
    });
    wrapper.vm.goToPage(2);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ query: { page: '2' } });
    expect(wrapper.vm.currentPage).toBe(2);
  });

  it('previousPage method decrements current page and updates query parameter', () => {
    wrapper = mount(Pagination, {
      mocks: {
        $route: {
          query: { page: '2' },
        },
        $router: {
          push: ()=>{},
        },
      },
      data() {
        return {
          currentPage: 2,
          itemsPerPage: 10,
          items: [],
        };
      },
    });
    wrapper.vm.previousPage();
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ query: { page: '1' } });
    expect(wrapper.vm.currentPage).toBe(1);
  });

  it('nextPage method increments current page and updates query parameter', () => {
    wrapper = mount(Pagination, {
      mocks: {
        $route: {
          query: { page: '1' },
        },
        $router: {
          push: ()=>{},
        },
      },
      data() {
        return {
          currentPage: 1,
          itemsPerPage: 10,
          items: [],
        };
      },
    });
    wrapper.vm.nextPage();
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ query: { page: '2' } });
    expect(wrapper.vm.currentPage).toBe(2);
  });

});
