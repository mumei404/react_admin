import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addApiList } from "../api/api";

export const CreateApi = () => {
	const { register, handleSubmit, formState: { isSubmitSuccessful, errors }, reset, control } = useForm();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'schemaItems'
	})
	const navigate = useNavigate();

	// https://codesandbox.io/s/react-hook-form-handlesubmit-with-reset-xrh0t?file=/src/index.js
	const [submittedData, setSubmittedData] = useState({})
	const onSubmit = data => {
		let nextData = { ...data, step: step + 1}
		setSubmittedData(nextData)
		if(data.step === 3) {
			const add = async (data) => {
				await addApiList(data);
				navigate('/api-list');
			}
			add(nextData)
		}
	};
	const back = e => {
		setSubmittedData({ ...submittedData, step: submittedData.step - 1 })
	};
	useEffect(() => {
		if(isSubmitSuccessful) {
			reset({ ...submittedData })
		}
	}, [isSubmitSuccessful, submittedData, reset])

	let step = submittedData.step || 1;

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="hidden" value={step + 1} {...register("step")} />
				{
					// https://react-hook-form.com/get-started
					step == 1 && (
						<>
							<section>
								<label htmlFor="apiName">API名</label>
								<br />
								<input {...register("apiName", { required: true })} />
								<br />
								{errors.apiName && <span>API名を入力してください</span>}
							</section>
							<br />
							<section>
								<label htmlFor="apiId">エンドポイント</label>
								<br />
								https://shimacms.dev/api/v1/
								<input {...register("apiId", { required: true })} />
								<br />
								{errors.apiId && <span>エンドポイントを入力してください</span>}
							</section>
						</>
					)
				}
				{
					step == 2 && (
						<>
							<section>
								<label htmlFor="apiType">リスト形式</label>
								<input type="radio" value="1" {...register("apiType", {required: true})} />
							</section>
							<section>
								<label htmlFor="apiType">オブジェクト形式</label>
								<input type="radio" value="2" {...register("apiType", {required: true})} />
							</section>
							{errors.apiType && <span>選択してね</span>}
						</>
					)
				}
				{
					// https://react-hook-form.com/api/usefieldarray
					step == 3 && (
						<>
							<ul>
								{fields.map((item, index) => {
									return (
									<section key={item.id}>
										<li>
											<label htmlFor={`schemaItems[${index}].fieldId`}>フィールドID</label>
											<input
												{...register(`schemaItems[${index}].fieldId`, {required: true})}
												defaultValue={`${item.fieldId}`}
											/>
											<label htmlFor={`schemaItems[${index}].displayName`}>表示名</label>
											<input
												{...register(`schemaItems[${index}].displayName`, {required: true})}
												defaultValue={`${item.displayName}`}
											/>
											<label htmlFor={`schemaItems[${index}].type`}>種類</label>
											<select {...register(`schemaItems[${index}].type`, {required: true})}>
												{['テキストフィールド', 'テキストエリア', '画像', 'セレクトフィールド'].map(selectValue => (
													<option key={selectValue} value={selectValue}>
														{selectValue}
													</option>
												))}
											</select>

											<button type="button" onClick={() => remove(index)}>
												削除
											</button>
										</li>
									</section>
									);
								})}
							</ul>
							<button
								type="button"
								onClick={() => {
									append({ fieldId: "", displayName: "", type: "テキストフィールド" });
								}}
							>
								フィールドを追加
							</button>
						</>
					)
				}
				<button>{step === 3 ? '作成' : '次へ'}</button>
			</form>
			{step > 1 && <button type="button" onClick={back}>戻る</button>}
		</>
	);
}
