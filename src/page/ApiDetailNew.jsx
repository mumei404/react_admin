import { useParams, useNavigate } from 'react-router-dom'
import { fetchApiOne } from '../api/api'
import { addApiContent } from '../api/apiContent'
import { useQuery } from 'react-query'
import { useForm, useFieldArray } from "react-hook-form";

const fetchData = async (id) => {
	const res = await fetchApiOne(id);
	return res;
}

export const ApiDetailNew = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data, isLoading, isError } = useQuery('apiDetail', () => fetchData(id), {
		cacheTime: 1000,
		staleTime: 1000,
		retry: 1,
	})

	const { register, handleSubmit, formState: { isSubmitSuccessful, errors }, reset, control } = useForm();
	const onSubmit = data => {
		const add = async (data) => {
			const res = await addApiContent({ ...data, apiId: id, id: (new Date).getTime() });
			navigate(`/api-list/${id}`);
		}
		add(data)
	}

	return (
		<>
			<h1>new</h1>
			{
				isLoading ?
					<span>Loading......</span>
				:
					isError ?
						<span>データが存在しません</span>
					:
						<form onSubmit={handleSubmit(onSubmit)}>
							{data.schemaItems.map(item => {
								return (
									<section key={item.fieldId}>
										<label htmlFor={item.fieldId}>{item.displayName}</label>
										<br />
										{
											// typeごとに綺麗に分岐したい
											item.type === 'テキストフィールド' ?
												<input {...register(item.fieldId, { required: true })} />
											:
												<textarea {...register(item.fieldId, { required: true })} />
										}
										{errors[item.fieldId] && <span>入力してください</span>}
										<br />
									</section>
								)
							})}
							<button>作成</button>
						</form>
			}
		</>
	)
}
