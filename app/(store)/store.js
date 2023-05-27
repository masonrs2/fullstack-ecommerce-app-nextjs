import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCart = create()(
    persist(
        (set) => ({
            cart: [],
            product: {},
            openModal: false,

            setOpenModal: () => {
                set((state) => {
                    return {
                        ...state,
                        openModal: !state.openModal
                    }
                })
            },

            emptyCart: () => {
                set((state) => {
                    const newCart = []
                    return {
                        ...state,
                        cart: newCart,
                    }
                })
            },

            setProduct: (item) => {
                const { newProduct } = item
                set((state) => {
                    return {
                        ...state,
                        product: newProduct
                    }
                })
        },

        removeItemFromCart: (itemId) => {
            // const { itemId } = params
            set((state) => {
                const newCart = state.cart.filter((product, productId) => {
                    return productId != itemId
                })
                return {
                    ...state, 
                    cart: newCart
                }
            })
        },

        addItemToCart: (item) => {
            const { newItem } = item
            set((state) => {
                const newCart = [...state.cart, item]
                return {
                    ...state,
                    cart: newCart,
                }
            })
        },

    }),{
        name: "global", getStorage: () => localStorage
    })
)

export default useCart