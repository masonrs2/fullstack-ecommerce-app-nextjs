import { create } from 'zustand'

const useCart = create(
    (set, get) => ({
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

        removeItemFromCart: (item) => {
            const { itemId } = params
            set((state) => {
                const newCart = state.cart.filter((product, productId) => {
                    return productId !== itemId
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
                const newCart = [...state.cart, newItem]
                return {
                    ...state,
                    cart: newCart,
                }
            })
        },

    })
)

export default useCart