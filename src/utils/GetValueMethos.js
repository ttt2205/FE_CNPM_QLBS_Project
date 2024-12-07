// Tim discount tot nhat
export const getDiscountValueLatest = (discounts) => {
    let discountLatest = {
        discountId: null,
        value: 0,
    };
    if (discounts.length > 0) {
        discounts.forEach((discount) => {
            let startAt = new Date(discount.start_at);
            let endAt = new Date(discount.end_at);
            let day = new Date();
            if (day >= startAt && day <= endAt) {
                if (discount.percent_value >= discountLatest.value) {
                    discountLatest.value = discount.percent_value;
                    discountLatest.discountId = discount.discount_id;
                }
            }
        });
    }
    return discountLatest;
};

