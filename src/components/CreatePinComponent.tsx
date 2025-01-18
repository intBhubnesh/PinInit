    "use client"
    import Button from '@/components/Button'
    import {DescriptionField} from '@/components/DescriptionField'
    import FormButton from '@/components/FormButton'
    import InputDropDown from '@/components/InputDropDown'
    import InputField from '@/components/InputField'
    import authServices from '@/services/auth'
    import services from '@/services/config'
    import Link from 'next/link'
    import { useRouter } from 'next/navigation'
    import React, { useCallback, useEffect, useState } from 'react'
    import { useForm } from 'react-hook-form'
    import { useSelector } from 'react-redux'

    interface FormDefaultValueInterface {
        title?: string;
        slug?: string;
        content?: string;
        status?: string;
        image ?: string | FileList
        collectionId  ?: string
    }

    interface CreatePostProps {
        $id?: string;
        title?: string;
        slug?: string;
        content?: string;
        status?: string;
        featuredImage ?: string;
        collectionId ?: string;
    }

    interface Pin {
        image?: File[];
        title: string;
        slug: string;
        content: string;
        featuredImage?: string;
        status: string;
        collectionId ?: string;
    }


    const CreatePinComponent : React.FC<CreatePostProps> = (post) => {
        const {register, handleSubmit, watch, setValue, getValues, control } = useForm<FormDefaultValueInterface>({
            defaultValues:{
                title : post?.title || '',
                slug : post?.slug || '',
                content  : post?.content || '',
                status : post?.title || 'Active',
                image : post?.featuredImage || '',
                collectionId : post?.collectionId || ''
            }
        })

        const userData = useSelector((state : any) => state.auth?.userData)
    console.log(userData, userData.$id);

        const router = useRouter()
        const [error, setError] = useState<string>('')

        const submit = async (data : any) => {
            try {
                    // Update the post
            if(post.featuredImage){
                // extract the image and upload to the bucket
                const updatePin  = data.image && data.image[0] ? await services.uploadFile(data.image[0]) : setError('No Valid Image For Upload Found')

            // 2. remove the old pin image
            if(updatePin){
                post?.featuredImage ? await services.deleteFile(post.featuredImage) : null
                data.featuredImage = updatePin.$id ? updatePin.$id : undefined

            }

            // 3. update the post using the new data
            const updatePost = post.$id ?  await services.updatePin(post.$id,{...data}) : undefined

            // 4. redirecto to the updated post
            if(updatePost) {
                router.push(`/board/pin/${updatePost.$id}`)
            }
            } else{
                // extract the image and upload to the bucket
                const newPin =  data.image?.[0] ? await services.uploadFile(data.image[0]) : null
                console.log("pin uploaded", newPin);

                // create new Pin
                if(newPin){
                    data.featuredImage = newPin.$id
                    const newPost =  userData?.$id ? await services.createPin({...data, userId: userData.$id}) : null
                    console.log("Post Created", newPost);

                    if(newPost) {
                        router.push(`/board/pin/${newPost.$id}`)
                        console.log("Successfully routed");

                    }
                }

            }
            } catch (error) {
                console.error('Error submitting form:', error);
            }


        }

        const slugTransform = useCallback((value: string): string => {
            if (!value) return ''
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s-]/g, '')  // Remove special chars
                .replace(/\s+/g, '-')              // Replace spaces with hyphens
                .substring(0, 36)                  // Limit to 36 chars
        }, [])

        useEffect(() => {
            const subscription = watch((value, {name}) => {
                if(name == 'title' && value.title){
                    setValue('slug', slugTransform(value.title), {shouldValidate : true})
                }
            })

            return () => {
                subscription.unsubscribe()
            }
        }, [watch, slugTransform, setValue ])

        const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);


        return (
    <form onSubmit={handleSubmit(submit)}>
            <div className=' bg-zinc-900 w-full  min-h-screen'>
                <div className='flex items-center justify-between p-6 border-b-[1.5px]  border-zinc-500/30 bg-zinc-950/70 h-18'>
                    <div className='inline-flex items-center justify-center'>
                        <h3 className='text-lg font-medium text-zinc-300'>Create a Pin</h3>
                    </div>
                    <div>
                        <Button
                            type='submit'
                            lable={ post.title ? 'UpdatePin' : 'PinInit'}
                        />
                    </div>
                </div>
                <div className=' flex items-center justify-evenly'>
                    <div className='gap-6 flex flex-col items-center justify-center mt-8 '>
                    <div
    className={`image-holder h-[480px] w-96 border-dashed border-2 inline-flex items-end justify-center rounded-3xl ${
        isDragOver ? 'border-white-100 bg-pink-500' : 'border-zinc-400/70 bg-zinc-600/30'
    }`}
    onClick={() => document.getElementById('pin')?.click()}
    onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
    }}
    onDragLeave={() => setIsDragOver(false)}
    onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
        setValue('image', files, { shouldValidate: true });
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(files[0]);
        }
    }}
    >
    {preview ? (
        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-3xl" />
    ) : (
        <div className="inline-flex items-center p-10 gap-32 justify-center flex-col">
        <input
            type="file"
            id="pin"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register('image', {
            required: !post,
            onChange: (e) => {
                const file = e.target.files?.[0];
                if (file) {
                setValue('image', e.target.files, { shouldValidate: true });
                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
                }
            },
            })}
        />
        <div className="inline-flex gap-4 flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.4"
                stroke="currentColor"
                className="text-zinc-200 size-10"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
            </svg>
            </div>
            <h3 className="text-zinc-200 text-sm max-w-[240px] text-center">
            Choose the file or drag and drop the file here!
            </h3>
        </div>
        <p className="text-zinc-200/30 text-[12px] text-center">
            We recommend using a high-quality .jpg file more than 300kb and less than 20MB.
        </p>
        </div>
    )}
    </div>

                        <div className='h-0.5 w-96 bg-zinc-400/40'></div>
                        <FormButton lable={'save'} className='w-96' />
                    </div>
                    <div className='max-w-96'>
                        <InputField
                            label={'Title'}
                            {...register('title', {required : !post})}
                        />
                        <DescriptionField
                        label={'Add Detailed description'}
                        control={control}
                        {...register('slug', {required : !post})}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                        />
                        <InputDropDown
                        label=''
                        options={["Option 1", "Option 2", "Option 3"]}
                        {...register('collectionId', {required : !post})}
                        />
                        <InputDropDown
                        label=''
                        options={["Active", "Disabled"]}
                        {...register('status', {required : !post})}
                        />
                    </div>
                </div>
            </div>
        </form>
        )
    }

    export default CreatePinComponent
