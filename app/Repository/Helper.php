<?php

if (!function_exists('convert_array_to_string')) {
    function convert_array_to_string($request)
    {
        $data = '';
        if($request->keywords != null and is_array($request->keywords)){
            foreach ($request->keywords as $index => $keyword) {
                if ($index != count($request->keywords) - 1) {
                    $data .= $keyword . ',';
                }
                if ($index == count($request->keywords) - 1) {
                    $data .= $keyword;
                }
            }
        }else{
            return 'nai';
        }
        return $data;
    }
}
