import { FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { instance } from "../api/axios.api";
import {
    ICategory,
    IResponseTransactionLoader,
    ITransaction,
} from "../types/types";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import { useLoaderData } from "react-router-dom";
import { formatToUSD } from "../helpers/currency.helper";
import Chart from "../components/Chart";

export const transactionLoader = async () => {
    const categories = await instance.get<ICategory[]>("/categories");
    const transactions = await instance.get<ITransaction[]>("/transactions");
    const totalIncome = await instance.get<number>("/transactions/income/find");
    const totalExpense = await instance.get<number>(
        "/transactions/expense/find",
    );

    const data = {
        categories: categories.data,
        transactions: transactions.data,
        totalIncome: totalIncome.data,
        totalExpense: totalExpense.data,
    };

    return data;
};
export const transactionAction = async ({ request }: any) => {
    switch (request.method) {
        case "POST": {
            const formData = await request.formData();
            const newTrasaction = {
                title: formData.get("title"),
                amount: +formData.get("amount"),
                category: formData.get("category"),
                type: formData.get("type"),
            };

            await instance.post("/transactions", newTrasaction);
            toast.success("Transaction added");
            return null;
        }
        case "DELETE": {
            const formData = await request.formData();
            const transactionId = formData.get("id");

            await instance.delete(`/transactions/${transactionId}`);
            toast.success("Transaction deleted");

            return null;
        }
    }
};
const Transactions: FC = () => {
    const { totalIncome, totalExpense } =
        useLoaderData() as IResponseTransactionLoader;
    return (
        <>
            <div className="grid grid-cols-3 gap-4 mt-4 items-start">
                {/* Add transaction form */}
                <div className="grid col-span-2">
                    <TransactionForm />
                </div>

                {/* Statistics blocks*/}
                <div className="rounded-md bg-slate-800 p-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="uppercase font-bold text-md text-center">
                                Total Income:
                            </p>
                            <p className="bg-green-600 rounded-sm mt-2 text-center p-1">
                                {formatToUSD.format(totalIncome)} $
                            </p>
                        </div>

                        <div>
                            <p className="uppercase font-bold text-md text-center">
                                Total Expense:
                            </p>
                            <p className="bg-red-600 rounded-sm mt-2 text-center p-1">
                                {formatToUSD.format(totalExpense)} $
                            </p>
                        </div>

                        <>
                            <Chart
                                totalIncome={totalIncome}
                                totalExpense={totalExpense}
                            />
                        </>
                    </div>
                </div>
            </div>
            {/* Transactions Tabel*/}
            <div>
                <TransactionTable limit={5} />
            </div>
        </>
    );
};

export default Transactions;
