import { productModalReducer, tenantDataReducer, tenantSiteCartReducer, tenantSiteCatalogueReducer, tenantSiteCategoriesReducer, tenantSiteGlobalCategoriesReducer, tenantSiteRecentOrdersReducer } from "./appReducer";

import { combineReducers } from "redux";

export default combineReducers({
    productModalState: productModalReducer,
    tenantDetails: tenantDataReducer,
    tenantSiteCategories: tenantSiteCategoriesReducer,
    tenantSiteCatalogue: tenantSiteCatalogueReducer,
    tenantSiteGlobalCategories: tenantSiteGlobalCategoriesReducer,
    tenantSiteRecentOrders: tenantSiteRecentOrdersReducer,
    tenantSiteCart: tenantSiteCartReducer,
});