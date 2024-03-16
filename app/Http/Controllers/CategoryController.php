<?php

namespace App\Http\Controllers;

use App\Models\Category;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;


class CategoryController extends Controller
{
    public function category()
    {
        return view('Backend.Layout');
    }

    public function add()
    {
        return view('Backend.Layout');
    }

    protected function createCategoryURL($request)
    {
        $slug = Str::slug($request->name);
        $categories = Category::where('slug', $slug)->get()->count();
        if ($categories == 0) {
            $url = $slug;
        } else {
            $url = $slug . '-' . Category::all()->count();
        }
        return $url;
    }

    public function store(Request $request)
    {
        if (!File::exists(storage_path('app/public/category'))) {
            File::makeDirectory(storage_path('app/public/category'));
        } else {
            return Response()->json('nai');
        }
        return Response()->json('kichu hoynai');
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'status'    => 'required'
        ]);

        if ($validator->fails()) {
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }



        $category = new Category();
        $category->name = $request->name;
        $category->slug = $this->createCategoryURL($request);
        $category->status = $request->status;
        $category->keywords = convert_array_to_string($request);
        $category->meta_title = $request->meta_title;
        $category->meta_description = $request->meta_description;

        if ($request->hasFile('image')) {
            $imageValidate = Validator::make($request->all(), [
                'image'     => 'mimes:jpg,png,jpeg,gif,svg|image'
            ]);
            if ($imageValidate->fails()) {
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $imageValidate->errors()->all()
                ]);
            }
            $image = $request->file('image');
            $name = $image->getClientOriginalName() . time() . '_rh' . '.jpg';
            $path = 'app/public/category';
            if (!File::exists(storage_path($path))) {
                File::makeDirectory(storage_path('app/public/category'));
            }
            $image_path = storage_path($path . '/' . $name);
            $manager = new ImageManager(new Driver());
            $manager->read($image)->save($image_path, 70);
            $category->image = $name;
        }

        if ($category->save()) {
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Saved Successfully'
            ]);
        } else {
            return Response()->json([
                'status'    => 403,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }


    public function editCategory($id)
    {
        return view('Backend.Layout');
    }

    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) {
            return Response()->json([
                'status'    => 200,
                'category'  => $category
            ]);
        } else {
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found'
            ]);
        }
    }

    public function parentCategory()
    {
        $categories = Category::where('status', 1)->orWhere('parent_id', null)->get();
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }

    public function updateCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'id'        => 'required',
            'slug'      => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }
        $category = Category::where('id', $request->id)->get()->first();
        $category->name = $request->name;
        if ($category->slug == $request->slug) {
            $category->slug = $request->slug;
        } else {
            $slugValidator = Validator::make($request->all(), [
                'slug'  => 'unique:categories.slug'
            ]);
            if ($slugValidator->fails()) {
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $slugValidator->errors()->all()
                ]);
            }
            $slug = $this->createCategoryURL($request);
            $category->slug = $slug;
        }
        if ($request->hasFile('image')) {
            $imageValidator = Validator::make($request->all(), [
                'image' => 'mimes:jpg,png,gif,svg,jpeg'
            ]);
            if ($imageValidator->fails()) {
                return Response()->json([
                    'status'    => 401,
                    'errors'    => $imageValidator->errors()->all()
                ]);
            }
            $image = $request->file('image');
            $name = $image->getClientOriginalName() . time() . '_rh' . '.jpg';
            $image_path = storage_path('app/public/category/' . $name);
            $manager = new ImageManager(new Driver());
            $manager->read($image)->save($image_path, 70);
            $category->image = $name;
        }
        $category->status = $request->status;
        $category->meta_title = $request->meta_title;
        $category->meta_description = $request->meta_description;
        $category->keywords = convert_array_to_string($request);
        if ($category->save()) {
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category update successfully'
            ]);
        } else {
            return Response()->json([
                'status'    => 402,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }



    public function parentCategories()
    {
        $categories = DB::table('categories')->where('parent_id', null)->orderByDesc('id')->get();
        return Response()->json([
            'status'        => 200,
            'categories'    => $categories
        ]);
    }

    public function deleteCategory($id)
    {
        $category = Category::where('id', $id)->get()->first();
        if ($category) {
            if (file_exists(storage_path('app/public/category/' . $category->image))) {
                unlink(storage_path('app/public/category/' . $category->image));
            }
            $category->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Delete Successfully'
            ]);
        } else {
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category not found.'
            ]);
        }
    }


    // Sub Category Function Start Here

    public function subCategoryAll()
    {
        return view('Backend.Layout');
    }

    public function subCategoryAdd()
    {
        return view('Backend.Layout');
    }
}
