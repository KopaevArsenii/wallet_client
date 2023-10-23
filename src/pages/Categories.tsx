import { FC, useState } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { Form, useLoaderData } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import CategoryModal from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import { ICategory } from "../types/types";

export const categoriesActions = async ({ request }: any) => {
    switch (request.method) {
        case "POST": {
            const formData = await request.formData();
            const title = {
                title: formData.get("title"),
            };
            await instance.post("/categories", title);
            return null;
        }
        case "PATCH": {
            const formData = await request.formData();
            const category = {
                title: formData.get("title"),
            };
            await instance.patch(`/categories/${formData.get("id")}`, category);

            return null;
        }
        case "DELETE": {
            const formData = await request.formData();
            const categoryId = formData.get("id");
            await instance.delete(`/categories/${categoryId}`);
            return null;
        }
    }
};

export const categoryLoader = async () => {
    const { data } = await instance.get<ICategory[]>("/categories");
    return data;
};

const Categories: FC = () => {
    const categories = useLoaderData() as ICategory[];
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [visiableModal, setVisiableModal] = useState<boolean>(false);
    return (
        <>
            <div className={"mt-10 p-4 rounded-md bg-slate-800"}>
                <h1>Your category list:</h1>

                {/* Category list */}
                <div className={"flex mt-2 items-center gap-2 flex-wrap"}>
                    {categories.map((category, index) => {
                        return (
                            <div
                                key={index}
                                className="group flex py-2 px-4 rounded-lg bg-blue-600 item-center relative gap-2"
                            >
                                {category.title}
                                <div className="absolute hidden px-4 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                                    <button
                                        onClick={() => {
                                            setCategoryId(category.id);
                                            setIsEdit(true);
                                            setVisiableModal(true);
                                        }}
                                    >
                                        <AiFillEdit />
                                    </button>
                                    <Form
                                        className={"flex"}
                                        method={"DELETE"}
                                        action={"/categories"}
                                    >
                                        <input
                                            type={"hidden"}
                                            name={"id"}
                                            value={category.id}
                                        />
                                        <button type={"submit"}>
                                            <AiFillCloseCircle />
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Add Category */}
                <button
                    onClick={() => setVisiableModal(true)}
                    className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
                >
                    <FaPlusCircle />
                    <span>Create a new category</span>
                </button>
            </div>

            {/* Add Category Modal */}
            {visiableModal ? (
                <CategoryModal
                    type={"post"}
                    setVisibleModal={setVisiableModal}
                />
            ) : null}

            {visiableModal && isEdit ? (
                <CategoryModal
                    type={"patch"}
                    id={categoryId}
                    setVisibleModal={setVisiableModal}
                />
            ) : null}
        </>
    );
};

export default Categories;
