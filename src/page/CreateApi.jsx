import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const CreateApi = () => {
	const { register, handleSubmit, watch, formState: { isSubmitSuccessful, errors }, getValues, setValue, reset } = useForm();
	const navigate = useNavigate();
	const [submittedData, setSubmittedData] = useState({})
	const onSubmit = data => {
		setSubmittedData({ ...data, step: step + 1})
		if(data.step === 3) {
			console.log('final')
		}
	};
	const back = e => {
		setSubmittedData({ ...submittedData, step: submittedData.step - 1 })
	};
	let step = submittedData.step || 1;
	useEffect(() => {
		if(isSubmitSuccessful) {
			reset({ ...submittedData })
		}
	}, [isSubmitSuccessful, submittedData, reset])

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="hidden" value={step + 1} {...register("step")} />
				{
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
					step == 3 && (
						<>
							<section>
						hogehogehoge
							</section>
						</>
					)
				}
				<button>{step === 3 ? '作成' : '次へ'}</button>
			</form>
			{step > 1 && <button type="button" onClick={back}>戻る</button>}
		</>
	);
}
