import { FC } from "react";
import { Form, useLoaderData, Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { IResponseTransactionLoader } from "../types/types";

const TransactionForm: FC = () => {
    const { categories } = useLoaderData() as IResponseTransactionLoader;

    return (
        <div className="rounded-md bg-slate-800 p-4">
            <Form method="post" className="grid gap-2" action="/transactions">
                <label className="grid" htmlFor="title">
                    <span>Title</span>
                    <input
                        required
                        type="text"
                        className="input"
                        name="title"
                        placeholder="title"
                    />
                </label>
                <label className="grid" htmlFor="amount">
                    <span>Amount</span>
                    <input
                        required
                        type="number"
                        className="input"
                        name="amount"
                        placeholder="amount"
                    />
                </label>

                {/* Select */}
                {categories.length ? (
                    <label htmlFor="category" className="grid">
                        <span>Category</span>
                        <select className="input" name="category" required>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <h1 className="text-red-500">Create a category first</h1>
                )}

                <Link to="/categories">
                    <button className="mt-2 flex max-w-fit items-center gap-2 text-white/50 hover:text-white">
                        <FaPlusCircle />
                        <span>Manage categories</span>
                    </button>
                </Link>

                {/* Radio buttons*/}
                <div className="flex gap-4 items-center">
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            className="form-radio text-blue-600"
                            type="radio"
                            name="type"
                            value="income"
                        />
                        <span>Income</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            className="form-radio text-blue-600"
                            type="radio"
                            name="type"
                            value="expense"
                        />
                        <span>Expense</span>
                    </label>
                </div>

                {/* Submit button */}
                <button className="btn btn-green max-w-fit mt-2">Submit</button>
            </Form>
        </div>
    );
};

export default TransactionForm;
