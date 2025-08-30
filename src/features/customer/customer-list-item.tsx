import type { Customer } from "../../types/customer/customer-types";
import { UserAvatar } from "../../ui/user-avatar";

type Props = {
  customer: Customer;
};

export const CustomerListItem = ({ customer }: Props) => {
  return (
    <li className="p-2 outline outline-zinc-200 rounded-lg flex gap-4 flex-1 items-center hover:cursor-pointer hover:bg-zinc-50">
      <UserAvatar
        fallback={`${customer.firstName[0]}${customer.lastName[0]}`.toUpperCase()}
      />
      <div className="flex flex-col">
        <span>
          {customer.firstName} {customer.lastName}
        </span>
        <span>{customer.email}</span>
      </div>
    </li>
  );
};
