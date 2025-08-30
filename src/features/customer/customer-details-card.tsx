import type { Customer } from "../../types/customer/customer-types";
import { UserAvatar } from "../../ui/user-avatar";

type Props = {
  customer: Customer;
};

export const CustomerDetailsCard = ({ customer }: Props) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 mt-4 gap-2 md:gap-0">
      <div className="flex h-fit items-center gap-4 px-1 md:px-0">
        <UserAvatar
          fallback={`${customer.firstName[0]}${customer.lastName[0]}`.toUpperCase()}
          className="w-20 h-20"
        />
        <div className="flex flex-col">
          <h2 className="font-semibold text-xl">
            {customer.firstName} {customer.lastName}
          </h2>
          <p className="font-medium text-zinc-600">{customer.email}</p>
        </div>
      </div>
      <div className="px-1 md:px-0">
        <span className="text-gray-500">Address</span>
        <p>
          {customer.streetNumber} {customer.street}
        </p>
        <p>
          {customer.city}, {customer.state} {customer.postCode}
        </p>
        <p>{customer.country}</p>
      </div>
      <div className="px-1 md:px-0">
        <span className="text-gray-500">Personal Info</span>
        <p>
          {customer.gender}, {customer.age} years old
        </p>
      </div>
    </div>
  );
};
