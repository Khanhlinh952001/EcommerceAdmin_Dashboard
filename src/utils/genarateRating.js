import React from "react";
import Icon from "../components/Icon";

import { StarIcon } from "../icons";

// generate rating
export const genRating = (rating, reviewsCount, iconSize) => {
  if (rating === 5) {
    return (
      <div className="flex">
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />

        {reviewsCount && (
          <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
        )}
      </div>
    );
  }
  if (rating === 4) {
    return (
      <div className="flex">
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />

        {reviewsCount && (
          <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
        )}
      </div>
    );
  }
  if (rating === 3) {
    return (
      <div className="flex">
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />

        {reviewsCount && (
          <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
        )}
      </div>
    );
  }
  if (rating === 2) {
    return (
      <div className="flex">
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />

        {reviewsCount && (
          <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
        )}
      </div>
    );
  }
  if (rating === 1) {
    return (
      <div className="flex">
        <Icon
          className={`text-yellow-300 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />

        {reviewsCount && (
          <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
        )}
      </div>
    );
  }
  if (rating === 0) {
    return (
      <div className="flex items-center">
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />
        <Icon
          className={`text-gray-600 w-${iconSize} h-${iconSize}`}
          icon={StarIcon}
        />

        {reviewsCount && (
          <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
        )}
      </div>
    );
  }
};

export const calculateProductStats = (reviews) => {
  const productStats = {};
  
  reviews.forEach((review) => {
    const { product_id, rating } = review;
    
    if (!productStats[product_id]) {
      productStats[product_id] = { totalRating: 0, totalComments: 0, reviewCount: 0 };
    }
    
    productStats[product_id].totalRating += rating;
    productStats[product_id].totalComments += 1;
    productStats[product_id].reviewCount += 1;
  });
  
  Object.keys(productStats).forEach((productId) => {
    const averageRating = productStats[productId].totalRating / productStats[productId].reviewCount;
    productStats[productId].averageRating = averageRating.toFixed(1);
  });
  
  return productStats;
};





